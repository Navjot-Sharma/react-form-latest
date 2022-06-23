import './App.scss';
import {Form, TextInput, SubmitButton} from 'react-form-latest';

function App(props) {
  return (
   <>
    <Form>
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
