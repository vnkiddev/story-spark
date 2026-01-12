import { writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'
const MAX_FILE_SIZE = (parseInt(process.env.MAX_FILE_SIZE_MB || '50') * 1024 * 1024) // Convert MB to bytes

export async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

export async function saveFile(file: File, subfolder: string = ''): Promise<string> {
  await ensureUploadDir()
  
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`)
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const fileExtension = path.extname(file.name)
  const fileName = `${uuidv4()}${fileExtension}`
  const filePath = path.join(UPLOAD_DIR, subfolder, fileName)
  
  // Ensure subfolder exists
  const subfolderPath = path.join(UPLOAD_DIR, subfolder)
  if (!existsSync(subfolderPath)) {
    await mkdir(subfolderPath, { recursive: true })
  }
  
  await writeFile(filePath, buffer)
  
  return `/uploads/${subfolder}/${fileName}`.replace(/\/+/g, '/')
}

export async function deleteFile(filePath: string): Promise<void> {
  try {
    // Remove leading slash and convert to actual file path
    const actualPath = filePath.startsWith('/uploads/') 
      ? filePath.replace('/uploads/', UPLOAD_DIR + '/')
      : path.join(UPLOAD_DIR, filePath)
    
    await unlink(actualPath)
  } catch (error) {
    console.error('Error deleting file:', error)
    // Don't throw error if file doesn't exist
  }
}

export function validateImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  return allowedTypes.includes(file.type)
}

export function validatePdfFile(file: File): boolean {
  return file.type === 'application/pdf'
}