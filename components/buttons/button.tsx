interface ButtonProps {
  children: React.ReactNode; //agar bisa di custom isi konten nya
  
}

function Button({ children }: ButtonProps) {
  return (
    <div>
      <button className="bg-blue-800 rounded-2xl">{children}</button>
    </div>
  );
}

export default Button;

/*
mambuat komponen yg bisa di className & custom attribute
1) buat interface agar tipe data nya jelas & konsisten & tidak error
*/
