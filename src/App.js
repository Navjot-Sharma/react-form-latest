import './App.scss';
import {Form, TextInput, Dropdown, SubmitButton} from 'react-form-latest';
// import { Form, TextInput, Dropdown, SubmitButton  } from "./dist/index";

// import Form from './lib/components/form/Form';
// import TextInput from './lib/components/text-input/TextInput';
// import Dropdown from './lib/components/dropdown/Dropdown';
// import SubmitButton from './lib/components/submit-button/SubmitButton';

function App() {
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
