export async function getServices() {
  try {
    const response = await fetch('./data/services.json');
    if (!response.ok) throw new Error('Failed to fetch services');
    const services = await response.json();
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}