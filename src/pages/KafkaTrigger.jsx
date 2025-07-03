import axios from 'axios';

const KafkaTrigger = () => {
  const triggerKafka = async () => {
    try {
      await axios.get('http://localhost:8080/api/test/kafka');
      alert('Kafka test message sent!');
    } catch (error) {
      console.error('Kafka test error:', error);
      alert('Failed to send Kafka message');
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold mb-4">Kafka Test Trigger</h2>
      <button onClick={triggerKafka} className="bg-green-500 text-white px-4 py-2 rounded">Trigger Kafka</button>
    </div>
  );
};

export default KafkaTrigger;
