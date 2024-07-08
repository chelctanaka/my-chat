import Input from "../atoms/Input";
import Sidebar from "../molucules/Sidebar";

export default function Templates({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3">
      <header className="h-screen sticky top-0 bg-gray-100 p-5 flex justify-end z-10">
        <Sidebar />
      </header>
      <main className="p-5">{children}</main>
      <div className="h-screen sticky top-0 bg-gray-100 p-5 z-10">
        <div className="w-1/2">
          <Input placeholder="Search" />
        </div>
      </div>
    </div>
  );
}
