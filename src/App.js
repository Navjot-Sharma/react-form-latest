import './App.scss';
import {Form, TextInput, SubmitButton} from 'react-form-latest';
// import { Form, TextInput, SubmitButton  } from "./dist/index";
function App() {
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
