import { shallowMount } from '@vue/test-utils'
import FormItem from '@/components/Money/FormItem.vue'

describe('FormItem.vue', () => {
  it('renders props.msg when passed', () => {
    const fieldName = 'new message'
    const wrapper = shallowMount(FormItem, {
      propsData: { fieldName }
    })
    expect(wrapper.text()).toMatch(fieldName)
  })
})
