import type { FileData } from 'payload/dist/uploads/types'
import type { PayloadRequest } from 'payload/types'

export interface File {
    buffer: Buffer
    filename: string
    mimeType: string
  }

export function getIncomingFiles({
  req,
  data,
}: {
  data: Partial<FileData>
  req: PayloadRequest
}): File[] {
  const file = req.files?.file

  let files: File[] = []

  if (file && data.filename && data.mimeType) {
    const mainFile: File = {
      filename: data.filename,
      mimeType: data.mimeType,
      buffer: file.data,
    }

    files = [mainFile]

    if (data?.sizes) {
      Object.entries(data.sizes).forEach(([key, resizedFileData]) => {
        if (req.payloadUploadSizes?.[key] && data.mimeType) {
          files = files.concat([
            {
              filename: `${resizedFileData.filename}`,
              mimeType: data.mimeType,
              buffer: req.payloadUploadSizes[key],
            },
          ])
        }
      })
    }
  }

  return files
}