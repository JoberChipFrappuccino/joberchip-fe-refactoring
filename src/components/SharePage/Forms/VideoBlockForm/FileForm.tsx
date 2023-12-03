interface FileFormProps {
  disabled: boolean
}
export const FileForm = ({ disabled }: FileFormProps) => {
  return <input type="file" id="file" name="file" accept=".mp4, .webm, .ogg, .quicktime" disabled={disabled} />
}
