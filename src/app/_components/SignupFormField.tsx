interface FormFieldProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
  };
  errors: {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
  };
  handleDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignupFormField({
  formData,
  errors,
  handleDataChange,
}: FormFieldProps) {
  // 필드 정보 배열
  const formFields = [
    {
      id: 'email',
      label: '아이디 (이메일 주소):',
      type: 'email',
      value: formData.email,
      placeholder: '예: sample@domain.com',
      error: errors.email,
    },
    {
      id: 'password',
      label: '비밀번호:',
      type: 'password',
      value: formData.password,
      placeholder: '비밀번호를 입력하세요',
      error: errors.password,
    },
    {
      id: 'confirmPassword',
      label: '비밀번호 확인:',
      type: 'password',
      value: formData.confirmPassword,
      placeholder: '비밀번호를 다시 입력하세요',
      error: errors.confirmPassword,
    },
    {
      id: 'nickname',
      label: '닉네임:',
      type: 'text',
      value: formData.nickname,
      placeholder: '닉네임을 입력하세요',
      error: errors.nickname,
    },
  ];

  return (
    <>
      {formFields.map((field) => (
        <div key={field.id} className="flex flex-col">
          <label
            htmlFor={field.id}
            className="text-sm text-white desktop:text-lg"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            value={field.value}
            className="inputCommon"
            placeholder={field.placeholder}
            onChange={handleDataChange}
            required
          />
          {field.error && (
            <p className="mt-1 text-sm text-red-500">{field.error}</p>
          )}
        </div>
      ))}
    </>
  );
}
