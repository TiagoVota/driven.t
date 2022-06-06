import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function InputCard(props) {
  const {
    mask,
    type,
    name,
    placeholder,
    onChange,
    onFocus,
    isFirst,
    width,
  } = props;
  
  return (
    <InputMask
      {...(mask && { mask, maskChar: '•' })}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
    >
      {() => <StyledTextField
        width={width}
        isFirst={isFirst}
        variant='outlined'
        name={name}
        onChange={onChange}
        label={placeholder}
        required
      />}
    </InputMask >
  );
}

const StyledTextField = styled(TextField)`
  margin-top: ${p => p.isFirst ? '0px' : '10px'} !important;
  width: ${p => p.width ? p.width : ''} !important;
`;
