import withLabel from './withLabel'
import Input from './input'
import Textarea from './textarea'

/** exported components */
export { default as withLabel } from './withLabel'

export { default as Input } from './input'
export const InputLabel = withLabel(Input)

export { default as Textarea } from './textarea'
export const TextareaLabel = withLabel(Textarea)
