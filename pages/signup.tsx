import Link from "next/link";
import { FormEvent, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { userService } from "../services/user-service";
import { toast } from "react-toastify";

export type ErrorTypo = {
  username?: string;
  password?: string;
};

export default function Login() {
  const [errors, seterrors] = useState<ErrorTypo>();
  const [loading, setloading] = useState(false)

  const [username, Setusername] = useState<string>("");
  const [password, Setpassword] = useState<string>("");


  const signupHandler = async (e: FormEvent) => {
    e.preventDefault();
    var isValid = Validation(username, password);
    if (isValid) {
      setloading(true)
      const user = await userService.signup(username, password);
      if(user.token){
        setloading(false)
        toast.dark("signed up")
      }
    }
  };

  function Validation(username: string, password: string) {
    if (!username) {
      console.log("usernae");
      if (!password) {
        seterrors({
          username: "username required 🤨",
          password: "enter password after username",
        });
        return false;
      }
      if (password.length < 8) {
        seterrors({
          username: "username required 🤨",
          password: "password must br at least 8 chars!",
        });
        return false;
      }
    } else if (!password) {
      seterrors({ password: "password IS required dude !!!" });
      return false;
    }
    if (username.length < 4) {
      if (password.length > 7) {
        seterrors({ username: "username must be at least 4 chars" });
        return false;
      } else {
        seterrors({
          username: "username must be at least 4 chars",
          password: "password must be at least 8 chars",
        });
        return false;
      }
    } else if (password.length < 8) {
      seterrors({ password: "password must be at least 8 chars" });
      return false;
    }
    seterrors({ username: "", password: "" });
    return true;
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow border-top border-bottom-0 border-primary">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    Abolfazl Note
                  </h2>
                  <p className=" mb-5">
                    Please enter your username and password!
                  </p>
                  <div className="mb-3">
                    <Form onSubmit={signupHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => Setusername(e.target.value)}
                        />
                        {errors?.username && (
                          <p className="text-danger ms-2">{errors.username}</p>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => Setpassword(e.target.value)}
                        />
                        {errors?.password && (
                          <p className="text-danger ms-2">{errors.password}</p>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          {loading ?'loading...' : 'SignUp'}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Back to -&gt;{" "}
                        <Link href="/login" className="text-primary fw-bold">
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
