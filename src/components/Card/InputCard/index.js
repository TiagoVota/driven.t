import { styled, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

export default function InputCard(props) {
  const {
    mask,
    type,
    name,
    placeholder,
    onChange,
    onFocus,
  } = props;
  
  return (
    <InputMask
      {...(mask && { mask, maskChar: '•' })}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      required
    >
      {() => <StyledTextField
        variant='outlined'
        name={name}
        onChange={onChange}
        label={placeholder}
      />}
    </InputMask >
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
`;
