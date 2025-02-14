interface CafeInfoProps {
  label: string;
  value: string | React.ReactNode;
}

export default function CafeInfoItem({ label, value }: CafeInfoProps) {
  return (
    <li className="cafeInfo" role="contentInfo">
      <h3 className="cafeInfoKey">{label}</h3>
      <p className="cafeInfoValue">{value}</p>
    </li>
  );
}
