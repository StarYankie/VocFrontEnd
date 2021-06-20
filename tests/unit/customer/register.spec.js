import { mount } from '@vue/test-utils'
import register from '@/components/customer/register'

describe('register.vue', () => {
  let wrapper
  let fieldUserId
  let fieldTitle
  let fieldContent
  let buttonSubmit

  beforeEach(() => {
    wrapper = mount(register)
    fieldUserId = wrapper.find('#userid')
    fieldTitle = wrapper.find('#title')
    fieldContent = wrapper.find('#content')
    buttonSubmit = wrapper.find('#submit')
  })

  it('should render registration form', () => {
    expect(fieldUserId.element.value).toEqual('')
    expect(fieldTitle.element.value).toEqual('')
    expect(fieldContent.element.value).toEqual('')
  })

  it('should contain data model with initial values', () => {
    expect(wrapper.vm.form.userid).toEqual('')
    expect(wrapper.vm.form.title).toEqual('')
    expect(wrapper.vm.form.content).toEqual('')
  })

  it('should have form inputs bound with data model', () => {
    const userid = 'testid'
    const title = 'test title'
    const content = 'test content'

    fieldUserId.element.value = userid
    fieldTitle.element.value = title
    fieldContent.element.value = content

    fieldUserId.trigger('input');
    fieldTitle.trigger('input');
    fieldContent.trigger('input');

    expect(wrapper.vm.form.userid).toEqual(userid)
    expect(wrapper.vm.form.title).toEqual(title)
    expect(wrapper.vm.form.content).toEqual(content)
  })
})
