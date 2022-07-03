# React Form Latest

Form libary which supports custom inputs and highly customizable.

Even if input fields are in child components top level Form will still include them.

### OUTPUT

```javascript
npm i react-form-latest
```

### Usage

```javascript
import './App.scss';
import {
  Form, 
  TextInput, 
  Dropdown, 
  Toggle, 
  Radio, 
  StarsInput,
  Chips,
  Tags,
  SubmitButton 
} from 'react-form-latest';

function App(props) {
  return (
    <>
    <Form
      className='p-20'
      onValue={value => console.log(value)}
    >

     <TextInput 
        field='name'
        label='Name'
        minLength={3}
        maxLength={50}
        required
      />
      <TextInput 
        field='age'
        label='Age'
        type='integer'
        min={0}
        max={150}
      />

      <Dropdown
       options={[
        {id: 'female', value: 'Female'},
        {id: 'male', value: 'Male'},
        {id: 'transgender', value: 'Transgender'},
        {id: 'secret', value: "Don't wish to disclose"},
       ]}
       field='gender'
       label='Gender'
       required
      />

      <TextInput 
        field='password'
        label='Password'
        type='password'
        required
      />

      <div className='d-flex aic'>
        <p>Marital Status: </p>
        <div className='d-flex aic'>
          <Radio
            field='maritalStatus'
            name='MaritalStatus'
            buttons={[
              {label: 'Married', id: 'married'},
              {label: 'Unmarried', id: 'unmarried'},
              {label: 'Other', id: 'other'},
            ]}
            className='mx-10'
            required
          />
        </div>
      </div>

      <Toggle
        field='status'
        label='Enable'
      />
      <Toggle
        field='agree'
        label='Yes, I agree to privacy policy and terms of conditions.'
        type='check'
        required
      />

      <StarsInput
        field='stars'
        required 
      />

      <Chips
        field='category'
        chips={[
          {label: 'Category1', value: 'category1'},
          {label: 'Category2', value: 'category2'},
          {label: 'Category3', value: 'category3'},
          {label: 'Category4', value: 'category4'},
        ]}
        value='category2'
        required
      />
      
      <Chips
        field='categories'
        multi
        chips={[
          {label: 'Category1', value: 'category1'},
          {label: 'Category2', value: 'category2'},
          {label: 'Category3', value: 'category3'},
          {label: 'Category4', value: 'category4'},
        ]}
        value={['category2', 'category3']}
        required
      />

      <Tags
        field='tags'
        chips={[
          {label: 'Category1', value: 'category1'},
          {label: 'Category2', value: 'category2'},
          {label: 'Category3', value: 'category3'},
          {label: 'Category4', value: 'category4'},
        ]}
      />

      <SubmitButton>Submit</SubmitButton>
    </Form>
   </>
  );
}

export default App;
```

### OUTPUT

```javascript
{
  age: "25"
  agree: true
  category: 'category2',
  categories: ['category2', 'category3']
  gender: "male"
  maritalStatus: "unmarried"
  name: "Navjot Sharma"
  password: "abcdefgh",
  status: false,
  stars: 4,
  tags: ['category1', 'category2', 'category3', 'category4']
}
```
### Inputs Supported

Inputs:
  ✔ TextInput
  ✔ Dropdown
  ✔ Radio
  ✔ Toggle
  ✔ Stars
  ✔ Chips
  ✔ Tags
  ☐ File
  ☐ TextEditor
  ☐ Datepicker
