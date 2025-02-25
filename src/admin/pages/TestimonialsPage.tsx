import TestimonialTable from '../components/TestimonialTable';

const TestimonialsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Témoignages</h1>
      <TestimonialTable />
    </div>
  );
};

export default TestimonialsPage;
