# React Form Latest

Create forms in React easily

```javascript
import './App.scss';
import {Form, TextInput, Dropdown, SubmitButton} from 'react-form-latest';

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

        <SubmitButton>Submit</SubmitButton>
      </Form>
    </>
  );
}

export default App;
```

### OUTPUT

```javascript
{firstName: 'Navjot', lastName: 'Sharma'}
```
### Inputs Supported

Inputs:
  ✔ TextInput
  ✔ Dropdown
  ☐ TextEditor
  ☐ Radio
  ☐ Toggle
  ☐ Stars
  ☐ Tags
  ☐ Chips
  ☐ File
  ☐ Datepicker
