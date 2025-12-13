interface LeadData {
    name: string;
    email: string;
    phone?: string;
    type: 'list' | 'report';
    propertyDetails?: {
        price: number;
        rent: number;
        yield: number;
        country: string;
    };
}

export const submitLead = async (data: LeadData): Promise<{ success: boolean; id?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('[LeadService] Submitting lead:', data);

    // In a real app, this would be a POST request to your backend or Firebase
    // const response = await fetch('/api/leads', { method: 'POST', body: JSON.stringify(data) });

    return { success: true, id: crypto.randomUUID() };
};
