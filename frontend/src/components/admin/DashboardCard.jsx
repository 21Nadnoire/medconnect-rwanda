// components/admin/DashboardCard.jsx
import { Link } from 'react-router-dom';

const DashboardCard = ({ icon, title, link, linkText }) => {
  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-white shadow-md rounded-lg text-center p-6 hover:shadow-xl transition">
        <div className="text-primary mb-4 text-4xl">
          <i className={`fa ${icon}`}></i>
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <Link
          to={link}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
