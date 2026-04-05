import { useApp } from '../context/AppContext';

export default function PaymentCard() {
  const { insights } = useApp();

  // Format balance to show in k format if >= 1000
  const formatBalance = (amount) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const balance = formatBalance(insights.netBalance);

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 mb-8">
      <div
        className="relative overflow-hidden rounded-2xl p-6 shadow-xl
                   bg-gradient-to-br from-blue-500 via-purple-500 to-rose-500
                   hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-out
                   group cursor-pointer"
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />

        {/* Shine effect on hover */}
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12
                      bg-gradient-to-r from-transparent to-white/20
                      group-hover:animate-shine translate-x-[-100%] group-hover:translate-x-[200%]
                      transition-transform duration-1000" />

        {/* Card Content */}
        <div className="relative z-10">
          {/* Top Row: Brand and Chip */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-white/80 text-xs font-medium tracking-wider uppercase mb-1">
                Total Balance
              </p>
              <h3 className="text-3xl font-bold text-white tracking-tight">
                {balance}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-white font-bold text-lg tracking-wider italic">
                Purry
              </span>
              <div className="flex gap-1 mt-2">
                <div className="w-6 h-4 rounded bg-yellow-400/90" />
                <div className="w-6 h-4 rounded bg-red-400/90 -ml-3" />
              </div>
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <p className="text-white/90 text-lg font-mono tracking-[0.15em]">
              **** **** **** 4568
            </p>
          </div>

          {/* Bottom Row: Expiry and Name */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-wider mb-0.5">
                Expires
              </p>
              <p className="text-white text-sm font-medium">
                09/28
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm font-medium tracking-wide">
                JOHN DOE
              </p>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      </div>
    </div>
  );
}
