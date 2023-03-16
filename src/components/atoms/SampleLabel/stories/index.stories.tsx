import { ComponentStoryObj, ComponentMeta } from "@storybook/react"
import { SampleLabel } from ".."

const meta: ComponentMeta<typeof SampleLabel> = {
  title: "Atoms/SampleLabel",
  component: SampleLabel,
}
export default meta


export const Sample: ComponentStoryObj<typeof SampleLabel> = {
  args: {
    title: "narrow",
  },
}

export const Sample2: ComponentStoryObj<typeof SampleLabel> = {
  args: {
    title: "narrow",
  },
}
