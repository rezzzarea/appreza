export interface ButtonProps{
  children?: React.ReactNode;
  className?: string; //mewajibkan tipe data string bila ingin isi value u/ className
  type?: "button" | "submit";
  disabled?:boolean;
}