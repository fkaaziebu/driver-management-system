import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const SignupRegisterModal = ({ open, setOpen }) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      resetOptions: {
        keepDirtyValues: true, // user-interacted input will be retained
        keepErrors: true, // input errors will be retained with value update
      },
    },
  });
  const submitLoginData = async (values) => {
    const res = await axios.post("http://localhost:5001/api/1.0/auth", values);
    console.log(res);
    setOpen(false);
    resetField("email");
    resetField("password");
  };

  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit(submitLoginData)}>
          {isLogin ? <LoginForm register={register} errors={errors} /> : <RegisterForm register={register} errors={errors} />}
          <Box sx={{ cursor: "pointer", mt: 3 }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? (
              <Typography>Don't have an account? Click to register.</Typography>
            ) : (
              <Typography>
                Already have an account? Click here to login
              </Typography>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default SignupRegisterModal;
