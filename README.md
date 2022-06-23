# React Form Latest

Create forms in React/React Native easily

```javascript
import './App.scss';
import {Form, TextInput, SubmitButton} from 'react-form-latest';

function App(props) {
  return (
   <>
    <Form
      onValue={value => console.log(value)}
    >
      <TextInput 
        field='firstName'
        label='First Name'
        required
      />
      <TextInput 
        field='lastName'
        label='Last Name'
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
