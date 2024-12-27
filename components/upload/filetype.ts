// Define a union type for all possible file types
type FileType =
  // Image types
  | "image/*"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff"
  // Video types
  | "video/*"
  | "video/mp4"
  | "video/mpeg"
  | "video/quicktime"
  | "video/x-msvideo"
  | "video/x-ms-wmv"
  | "video/webm"
  | "video/ogg"
  // Audio types
  | "audito/*"
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | "audio/aac"
  | "audio/flac"
  | "audio/x-wav"
  // Document types
  | "application/*"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "text/plain"
  | "text/csv"
  | "application/json"
  | "application/zip"
  // Others
  | "application/octet-stream"
  | "application/x-tar"
  | "application/x-rar-compressed";

  export default FileType