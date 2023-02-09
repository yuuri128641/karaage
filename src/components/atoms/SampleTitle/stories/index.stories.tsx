import { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { SampleTitle } from '..'

const meta: ComponentMeta<typeof SampleTitle> = {
  title: 'Atoms/SampleTitle',
  component: SampleTitle,
}
export default meta


export const Sample: ComponentStoryObj<typeof SampleTitle> = {
  args: {
    title: 'narrow',
  },
}

export const Sample2: ComponentStoryObj<typeof SampleTitle> = {
  args: {
    title: 'narrow',
  },
}
