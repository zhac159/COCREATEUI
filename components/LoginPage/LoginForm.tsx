import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import {UserLoginDTO  } from './../../httpClient';


function LoginForm() {



  const {  handleSubmit } = useForm<UserLoginDTO>();

  const onSubmit = (data: UserLoginDTO) => {
    console.log(data);
  };


  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} p={5} shadow="md" borderWidth={1}>
      <FormControl >
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input name="username" />
      </FormControl>

      <FormControl mt={4} >
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input type="password" name="password" />
      </FormControl>

      <Button mt={4} colorScheme="teal"  type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default LoginForm;