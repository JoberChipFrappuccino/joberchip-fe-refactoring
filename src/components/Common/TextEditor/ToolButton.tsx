import styles from './ToolButton.module.scss'

interface toolTypes {
  label: string
  icon: string
  text: string
  action: string
  type: string
  option?: string
}

interface ToolButtonProps {
  tool: toolTypes
  optionType: string
  blockButton: string
  toggleButton: Record<string, boolean>
  handleBlockClick: (e: React.MouseEvent, action: string) => void
  handleTogggleClick: (e: React.MouseEvent, action: string) => void
  handleOptionType: (e: React.MouseEvent, option: string, label: string) => void
}

export default function ToolButton(props: ToolButtonProps) {
  const isActive =
    props.tool.action === props.blockButton ||
    props.toggleButton[props.tool.action] ||
    props.tool.option === props.optionType
  const imageSrc = isActive ? `/EditorIcons/${props.tool.label}_active.svg` : `/EditorIcons/${props.tool.icon}`
  return (
    <div
      className={`${styles.toolItem} ${props.tool.option === props.optionType && styles.toolOptionActive}`}
      onMouseDown={(e) => {
        if (props.tool.type === 'block') {
          props.handleBlockClick(e, props.tool.action)
        } else if (props.tool.type === 'inline') {
          props.handleTogggleClick(e, props.tool.action)
        } else {
          if (props.tool.option) {
            props.handleOptionType(e, props.tool.option, props.tool.label)
          }
        }
      }}
    >
      {props.tool.icon ? <img src={imageSrc} /> : <span>{props.tool.text}</span>}
    </div>
  )
}
