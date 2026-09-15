import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FieldErrors {
  email?: string;
  password?: string;
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [apiError, setApiError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Validation ----
  const validateField = (field: "email" | "password", value: string): string | undefined => {
    if (field === "email") {
      if (!value.trim()) return "Username or email is required.";
    }
    if (field === "password") {
      if (!value) return "Password is required.";
    }
    return undefined;
  };

  const validateAll = (): boolean => {
    const newErrors: FieldErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "email" ? email : password;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") setEmail(value);
    else setPassword(value);

    // clear that field's error as user types, and clear stale API error
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
    if (apiError) setApiError("");
  };

  // ---- Backend error mapping ----
  // Adjust this once your backend is live, based on actual response shape/status codes.
  // const mapBackendError = (code: string): void => {
  //   switch (code) {
  //     case "INVALID_USER":
  //       setApiError("Invalid User");
  //       setErrors((prev) => ({ ...prev, email: "Invalid User" }));
  //       break;
  //     case "INCORRECT_PASSWORD":
  //       setApiError("Incorrect Password");
  //       setErrors((prev) => ({ ...prev, password: "Incorrect Password" }));
  //       break;
  //     case "INCORRECT_USERNAME":
  //       setApiError("Incorrect Username");
  //       setErrors((prev) => ({ ...prev, email: "Incorrect Username" }));
  //       break;
  //     default:
  //       setApiError("Something went wrong. Please try again.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setApiError("");

    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with real API call once backend is ready
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await res.json();
      // if (!res.ok) {
      //   mapBackendError(data.errorCode);
      //   return;
      // }

      console.log("Login:", { email, password });
      navigate("/services");
    } catch (err) {
      setApiError("Unable to reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeff4] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] flex flex-col sm:flex-row bg-white shadow-[0_0_5px_#999]">

        <div className="w-full sm:w-[60%] bg-[#2aa15f] p-[30px] sm:[clip-path:polygon(0_0,0%_100%,100%_0)]">
          <div className="text-white w-full">
            <h2 className="mb-[15px] text-[30px] font-bold">Welcome!</h2>
            <p className="mb-[20px] text-[16px] font-medium leading-[22px]">
              Create your account.
              <br />
              For Free!
            </p>
            <Link
              to="/signup"
              className="inline-block rounded-full border border-white px-5 py-[7px] text-[16px] tracking-[1px] text-white transition hover:bg-white hover:text-[#2aa15f]"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="w-full sm:w-[50%] p-[30px] sm:ml-[-10%] sm:py-[60px]">
          <div className="w-full">
            <h2 className="mb-[15px] text-[22px] font-bold">Login</h2>

            {/* Banner for backend-driven errors */}
            {apiError && (
              <div
                role="alert"
                className="mb-[12px] rounded-md border border-[#ff574e] bg-[#ffecea] px-[10px] py-[8px] text-[13px] text-[#c0392b]"
              >
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-[10px]">
                <label className="mb-[2px] block w-full tracking-[0.5px]">
                  Username/Email address
                  <span className="pl-[2px] text-[#ff574e]">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={!!(touched.email && errors.email)}
                  className={`block h-[35px] w-full rounded-full border px-[10px] outline-none ${
                    touched.email && errors.email
                      ? "border-[#ff574e]"
                      : "border-[#cccccc] focus:border-[#ff574e]"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">{errors.email}</p>
                )}
              </div>

              <div className="mb-[10px]">
                <label className="mb-[2px] block w-full tracking-[0.5px]">
                  Password
                  <span className="pl-[2px] text-[#ff574e]">*</span>
                </label>

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  aria-invalid={!!(touched.password && errors.password)}
                  className={`block h-[35px] w-full rounded-full border px-[10px] outline-none ${
                    touched.password && errors.password
                      ? "border-[#ff574e]"
                      : "border-[#cccccc] focus:border-[#ff574e]"
                  }`}
                />
                {touched.password && errors.password && (
                  <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">{errors.password}</p>
                )}
              </div>

              <div className="mb-[10px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-[5px] h-[35px] w-full cursor-pointer rounded-full border border-[#2aa15f] bg-transparent text-[16px] tracking-[1px] text-[#2aa15f] transition hover:bg-[#2aa15f] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </div>

              <div className="pt-[3px]">
                <Link to="/forgot-password" className="text-[14px] text-[#2aa15f] no-underline">
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;