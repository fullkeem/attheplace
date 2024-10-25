export const handleError = (message: string, setErrors) => {
  switch (message) {
    case '이메일을 입력하세요':
      setErrors((prev) => ({
        ...prev,
        email: '이메일을 입력하세요.',
      }));
      break;

    case '잘못된 이메일 형식입니다':
      setErrors((prev) => ({
        ...prev,
        email: '잘못된 이메일 형식입니다.',
      }));
      break;

    case '비밀번호를 입력하세요':
      setErrors((prev) => ({
        ...prev,
        password: '비밀번호를 입력하세요.',
      }));
      break;

    case '잘못된 비밀번호 형식입니다':
      setErrors((prev) => ({
        ...prev,
        password: '비밀번호는 최소 8자, 숫자 및 특수 문자를 포함해야 합니다.',
      }));
      break;

    case '닉네임 길이 3자~8자':
      setErrors((prev) => ({
        ...prev,
        nickname: '닉네임은 3자에서 8자 사이여야 합니다.',
      }));
      break;

    case '이미 사용 중인 이메일입니다':
      setErrors((prev) => ({
        ...prev,
        email: '이미 사용 중인 이메일입니다.',
      }));
      break;

    case '이미 사용 중인 닉네임입니다':
      setErrors((prev) => ({
        ...prev,
        nickname: '이미 사용 중인 닉네임입니다.',
      }));
      break;

    default:
      alert(`회원가입에 실패했습니다: ${message}`);
      break;
  }
};
