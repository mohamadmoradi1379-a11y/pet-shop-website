import { Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "ارسال به سراسر کشور",
  },
  {
    icon: RotateCcw,
    title: "بازگشت آسان",
    desc: "۷ روز ضمانت بازگشت",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت",
    desc: "تضمین اصل بودن کالا",
  },
  {
    icon: CreditCard,
    title: "پرداخت امن",
    desc: "درگاه مطمئن بانکی",
  },
];

export default function ServiceFeatures() {
  return (
    <div className="bg-white mt-2.5 py-5 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-full bg-[#f0f0f1] flex items-center justify-center flex-shrink-0">
              <f.icon className="w-5 h-5 text-[#3d4152]" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-[#3d4152]">{f.title}</div>
              <div className="text-[10px] text-[#81858b] mt-0.5">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
