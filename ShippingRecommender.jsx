import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp, DollarSign, CheckCircle, Weight } from 'lucide-react';

const DeliveryRecommender = () => {
  const [formData, setFormData] = useState({
    volume: '',
    origin: '',
    destination: '',
    urgency: 'normal',
    weight: ''  // Cambiado de budget a weight
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular llamada a la API
    setTimeout(() => {
      const mockRecommendations = [
        {
          provider: "Proveedor Premium",
          score: 0.89,
          metrics: {
            fulfillment: 95,
            cost_efficiency: 87,
            capacity: 78
          },
          cost: 15000,
          weightCapacity: "Hasta 1000 kg",
          estimated_time: "24-48 horas",
          reliability: "Alta",
          specialFeatures: ["Seguimiento en tiempo real", "Seguro incluido", "Manejo de carga pesada"]
        },
        {
          provider: "Proveedor Económico",
          score: 0.84,
          metrics: {
            fulfillment: 92,
            cost_efficiency: 90,
            capacity: 82
          },
          cost: 12000,
          weightCapacity: "Hasta 500 kg",
          estimated_time: "48-72 horas",
          reliability: "Media",
          specialFeatures: ["Seguro básico", "Carga estándar"]
        }
      ];
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);
  };

  const getWeightIndicator = (weightCapacity, requestedWeight) => {
    const maxWeight = parseInt(weightCapacity.match(/\d+/)[0]);
    const weight = parseFloat(requestedWeight);
    if (weight <= maxWeight * 0.5) return "text-green-500";
    if (weight <= maxWeight * 0.8) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-6 h-6" />
            Sistema de Recomendación de Proveedores
          </CardTitle>
          <CardDescription>
            Ingrese los detalles de su envío para obtener las mejores recomendaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Volumen de Paquetes
                </label>
                <input
                  type="number"
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Cantidad de paquetes"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Peso Total (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Peso en kilogramos"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Origen
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Ciudad de origen"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Destino
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Ciudad de destino"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Urgencia
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="low">Baja (Económico)</option>
                  <option value="normal">Normal (Estándar)</option>
                  <option value="high">Alta (Express)</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Analizando opciones...</>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Obtener Recomendaciones
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      {recommendations && (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Se encontraron {recommendations.length} proveedores que coinciden con tus criterios
            </AlertDescription>
          </Alert>

          {recommendations.map((rec, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{rec.provider}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">
                        {rec.estimated_time}
                      </Badge>
                      <Badge variant={rec.reliability === "Alta" ? "success" : "warning"}>
                        Confiabilidad {rec.reliability}
                      </Badge>
                      <Badge variant="outline">
                        {rec.weightCapacity}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold">
                      ${rec.cost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Score: {(rec.score * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 mx-auto mb-2 text-green-500" />
                    <div className="text-sm text-gray-600">Cumplimiento</div>
                    <div className="text-lg font-medium">{rec.metrics.fulfillment}%</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm text-gray-600">Eficiencia</div>
                    <div className="text-lg font-medium">{rec.metrics.cost_efficiency}%</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                    <div className="text-sm text-gray-600">Capacidad</div>
                    <div className="text-lg font-medium">{rec.metrics.capacity}%</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-2">Características especiales:</div>
                  <ul className="list-disc pl-5">
                    {rec.specialFeatures.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryRecommender;