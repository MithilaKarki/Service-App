import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  bio?: string;
  profilePicture?: string;
}

type FieldName = keyof FieldErrors;

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [apiError, setApiError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Validation ----
  const validateField = (
    field: FieldName,
    values: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      phone: string;
      bio: string;
      profilePicture: File | null;
    }
  ): string | undefined => {
    switch (field) {
      case "username": {
        const v = values.username.trim();
        if (!v) return "Username is required.";
        if (v.length < 3) return "Username must be at least 3 characters.";
        if (/\s/.test(v)) return "Username cannot contain spaces.";
        if (!/^[a-zA-Z0-9_.]+$/.test(v))
          return "Username can only contain letters, numbers, underscores, and dots.";
        return undefined;
      }
      case "email": {
        const v = values.email.trim();
        if (!v) return "Email is required.";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(v)) return "Please enter a valid email address.";
        return undefined;
      }
      case "password": {
        const v = values.password;
        if (!v) return "Password is required.";
        if (v.length < 8) return "Password must be at least 8 characters.";
        if (!/[A-Z]/.test(v)) return "Password must include at least one uppercase letter.";
        if (!/[0-9]/.test(v)) return "Password must include at least one number.";
        if (!/[^A-Za-z0-9]/.test(v)) return "Password must include at least one special character.";
        return undefined;
      }
      case "confirmPassword": {
        if (!values.confirmPassword) return "Please confirm your password.";
        if (values.confirmPassword !== values.password) return "Passwords do not match.";
        return undefined;
      }
      case "phone": {
        const v = values.phone.trim();
        if (!v) return "Phone number is required.";
        if (!/^\d+$/.test(v)) return "Please enter a valid phone number.";
        if (v.length !== 10) return "Please enter a valid phone number.";
        return undefined;
      }
      case "bio": {
        // optional field — only validate if provided
        if (values.bio && values.bio.length > 250) {
          return "Bio must be under 250 characters.";
        }
        return undefined;
      }
      case "profilePicture": {
        // optional field — only validate if provided
        const file = values.profilePicture;
        if (!file) return undefined;
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!validTypes.includes(file.type)) {
          return "Only .jpg, .jpeg, or .png files are allowed.";
        }
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
          return "Image must be under 2MB.";
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const currentValues = {
    username,
    email,
    password,
    confirmPassword,
    phone,
    bio,
    profilePicture,
  };

  const validateAll = (): boolean => {
    const fields: FieldName[] = [
      "username",
      "email",
      "password",
      "confirmPassword",
      "phone",
      "bio",
      "profilePicture",
    ];
    const newErrors: FieldErrors = {};
    fields.forEach((f) => {
      const err = validateField(f, currentValues);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((v) => !v);
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, currentValues) }));
  };

  const handleChange = (field: FieldName, value: string) => {
    const updated = { ...currentValues, [field]: value };

    switch (field) {
      case "username": setUsername(value); break;
      case "email": setEmail(value); break;
      case "password": setPassword(value); break;
      case "confirmPassword": setConfirmPassword(value); break;
      case "phone": setPhone(value); break;
      case "bio": setBio(value); break;
    }

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, updated) }));
    }
    if (field === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField("confirmPassword", updated),
      }));
    }
    if (apiError) setApiError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfilePicture(file);

    // revoke old preview URL to avoid memory leaks
    if (profilePicturePreview) URL.revokeObjectURL(profilePicturePreview);

    if (file) {
      setProfilePicturePreview(URL.createObjectURL(file));
    } else {
      setProfilePicturePreview("");
    }

    setTouched((prev) => ({ ...prev, profilePicture: true }));
    const updated = { ...currentValues, profilePicture: file };
    setErrors((prev) => ({
      ...prev,
      profilePicture: validateField("profilePicture", updated),
    }));
    if (apiError) setApiError("");
  };

  // ---- Backend error mapping ----
  // Your Django view returns: { "errors": { "field_name": ["message"] } }
  const mapBackendErrors = (backendErrors: Record<string, string[]>): void => {
    const fieldMap: Record<string, FieldName> = {
      username: "username",
      email: "email",
      password: "password",
      confirm_password: "confirmPassword",
      phone_number: "phone",
      bio: "bio",
      profile_picture: "profilePicture",
    };

    const newErrors: FieldErrors = {};
    let firstMessage = "";

    Object.entries(backendErrors).forEach(([key, messages]) => {
      const mappedField = fieldMap[key];
      const message = Array.isArray(messages) ? messages[0] : String(messages);
      if (!firstMessage) firstMessage = message;
      if (mappedField) {
        newErrors[mappedField] = message;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setApiError(firstMessage || "Signup failed. Please check the fields above.");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      phone: true,
      bio: true,
      profilePicture: true,
    });
    setApiError("");

    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirm_password", confirmPassword);
      formData.append("phone_number", phone);
      formData.append("bio", bio);
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }

      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        // don't set Content-Type — the browser sets the multipart boundary itself
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        mapBackendErrors(data.errors ?? {});
        return;
      }

      navigate("/login");
    } catch (err) {
      setApiError("Unable to reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: FieldName) =>
    `block h-[35px] w-full rounded-full border px-[10px] outline-none ${
      touched[field] && errors[field]
        ? "border-[#ff574e]"
        : "border-[#cccccc] focus:border-[#ff574e]"
    }`;

  return (
    <div className="min-h-screen bg-[#eaeff4] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] flex flex-col sm:flex-row bg-white shadow-[0_0_5px_#999]">

        {/* LEFT SIDE */}
        <div className="w-full sm:w-[60%] bg-[#2aa15f] p-[30px] sm:[clip-path:polygon(0_0,0%_100%,100%_0)]">
          <div className="text-white w-full">
            <h2 className="mb-[15px] text-[30px] font-bold">Welcome!</h2>
            <p className="mb-[20px] text-[16px] font-medium leading-[22px]">
              Already have an account?
              <br />
              Login here!
            </p>
            <Link
              to="/login"
              className="inline-block rounded-full border border-white px-5 py-[7px] text-[16px] tracking-[1px] text-white transition hover:bg-white hover:text-[#2aa15f]"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full sm:w-[50%] p-[30px] sm:ml-[-10%] sm:py-[60px]">
          <h2 className="mb-[15px] text-[22px] font-bold">Sign Up</h2>

          {apiError && (
            <div
              role="alert"
              className="mb-[12px] rounded-md border border-[#ff574e] bg-[#ffecea] px-[10px] py-[8px] text-[13px] text-[#c0392b]"
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* USERNAME */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">
                Username
                <span className="pl-[2px] text-[#ff574e]">*</span>
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => handleChange("username", e.target.value)}
                onBlur={() => handleBlur("username")}
                aria-invalid={!!(touched.username && errors.username)}
                className={inputClass("username")}
              />
              {touched.username && errors.username && (
                <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">{errors.username}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">
                Email
                <span className="pl-[2px] text-[#ff574e]">*</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!(touched.email && errors.email)}
                className={inputClass("email")}
              />
              {touched.email && errors.email && (
                <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">
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
                className={inputClass("password")}
              />
              {touched.password && errors.password ? (
                <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">{errors.password}</p>
              ) : (
                <p className="mt-[3px] pl-[8px] text-[11px] text-gray-400">
                  Min 8 characters, 1 uppercase letter, 1 number, 1 special character.
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">
                Confirm Password
                <span className="pl-[2px] text-[#ff574e]">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                className={inputClass("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* PHONE NUMBER */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">
                Phone Number
                <span className="pl-[2px] text-[#ff574e]">*</span>
              </label>
              <input
                type="tel"
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/[^\d]/g, ""))}
                onBlur={() => handleBlur("phone")}
                maxLength={10}
                aria-invalid={!!(touched.phone && errors.phone)}
                className={inputClass("phone")}
              />
              {touched.phone && errors.phone && (
                <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">{errors.phone}</p>
              )}
            </div>

            {/* BIO (optional) */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">Bio</label>
              <textarea
                placeholder="Tell us a bit about yourself (optional)"
                value={bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                onBlur={() => handleBlur("bio")}
                maxLength={250}
                rows={3}
                aria-invalid={!!(touched.bio && errors.bio)}
                className={`block w-full rounded-2xl border px-[10px] py-[8px] outline-none resize-none ${
                  touched.bio && errors.bio
                    ? "border-[#ff574e]"
                    : "border-[#cccccc] focus:border-[#ff574e]"
                }`}
              />
              <div className="mt-[3px] flex justify-between pl-[8px] pr-[4px]">
                {touched.bio && errors.bio ? (
                  <p className="text-[12px] text-[#ff574e]">{errors.bio}</p>
                ) : (
                  <span />
                )}
                <p className="text-[11px] text-gray-400">{bio.length}/250</p>
              </div>
            </div>

            {/* PROFILE PICTURE (optional) */}
            <div className="mb-[10px]">
              <label className="mb-[2px] block tracking-[0.5px]">Profile Picture</label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                aria-invalid={!!(touched.profilePicture && errors.profilePicture)}
                className="block w-full text-[13px]"
              />
              {profilePicturePreview && (
                <img
                  src={profilePicturePreview}
                  alt="Profile preview"
                  className="mt-[8px] h-[70px] w-[70px] rounded-full object-cover border border-[#cccccc]"
                />
              )}
              {touched.profilePicture && errors.profilePicture ? (
                <p className="mt-[3px] pl-[8px] text-[12px] text-[#ff574e]">
                  {errors.profilePicture}
                </p>
              ) : (
                <p className="mt-[3px] pl-[8px] text-[11px] text-gray-400">
                  JPG or PNG, max 2MB.
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-[5px] h-[35px] w-full cursor-pointer rounded-full border border-[#2aa15f] bg-transparent text-[16px] tracking-[1px] text-[#2aa15f] transition hover:bg-[#2aa15f] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;