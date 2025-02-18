import MenuItem from './MenuItem';

export default function LogOutMenu({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <>
      <MenuItem label="로그인" href="/login" onClick={toggleMenu} />
      <MenuItem label="회원가입" href="/signup" onClick={toggleMenu} />
    </>
  );
}
