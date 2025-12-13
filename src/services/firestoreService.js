import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Firestore Service
 * Handles all Firestore database operations for saved properties and calculations
 */

// Collections
const COLLECTIONS = {
    SAVED_PROPERTIES: 'savedProperties',
    CALCULATIONS: 'calculations',
    USER_FAVORITES: 'userFavorites'
};

/**
 * Save a property calculation
 * @param {string} userId - User ID
 * @param {Object} calculationData - Property calculation data
 * @returns {Promise<Object>} Result with success status and document ID
 */
export const saveCalculation = async (userId, calculationData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.CALCULATIONS), {
            userId,
            ...calculationData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return {
            success: true,
            id: docRef.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Get all calculations for a user
 * @param {string} userId - User ID
 * @param {number} maxResults - Maximum number of results (default: 50)
 * @returns {Promise<Object>} Result with calculations array
 */
export const getUserCalculations = async (userId, maxResults = 50) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.CALCULATIONS),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(maxResults)
        );

        const querySnapshot = await getDocs(q);
        const calculations = [];

        querySnapshot.forEach((doc) => {
            calculations.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return {
            success: true,
            calculations
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            calculations: []
        };
    }
};

/**
 * Get a specific calculation by ID
 * @param {string} calculationId - Calculation document ID
 * @returns {Promise<Object>} Result with calculation data
 */
export const getCalculation = async (calculationId) => {
    try {
        const docRef = doc(db, COLLECTIONS.CALCULATIONS, calculationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                success: true,
                calculation: {
                    id: docSnap.id,
                    ...docSnap.data()
                }
            };
        } else {
            return {
                success: false,
                error: 'Calculation not found'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Update a calculation
 * @param {string} calculationId - Calculation document ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Result with success status
 */
export const updateCalculation = async (calculationId, updateData) => {
    try {
        const docRef = doc(db, COLLECTIONS.CALCULATIONS, calculationId);
        await updateDoc(docRef, {
            ...updateData,
            updatedAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Delete a calculation
 * @param {string} calculationId - Calculation document ID
 * @returns {Promise<Object>} Result with success status
 */
export const deleteCalculation = async (calculationId) => {
    try {
        await deleteDoc(doc(db, COLLECTIONS.CALCULATIONS, calculationId));
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Save a property to favorites
 * @param {string} userId - User ID
 * @param {Object} propertyData - Property data
 * @returns {Promise<Object>} Result with success status and document ID
 */
export const saveToFavorites = async (userId, propertyData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.USER_FAVORITES), {
            userId,
            ...propertyData,
            createdAt: serverTimestamp()
        });

        return {
            success: true,
            id: docRef.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Get user's favorite properties
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Result with favorites array
 */
export const getUserFavorites = async (userId) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.USER_FAVORITES),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const favorites = [];

        querySnapshot.forEach((doc) => {
            favorites.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return {
            success: true,
            favorites
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            favorites: []
        };
    }
};

/**
 * Remove a property from favorites
 * @param {string} favoriteId - Favorite document ID
 * @returns {Promise<Object>} Result with success status
 */
export const removeFromFavorites = async (favoriteId) => {
    try {
        await deleteDoc(doc(db, COLLECTIONS.USER_FAVORITES, favoriteId));
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Save a property with calculation
 * @param {string} userId - User ID
 * @param {Object} propertyData - Complete property and calculation data
 * @returns {Promise<Object>} Result with success status and document ID
 */
export const saveProperty = async (userId, propertyData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.SAVED_PROPERTIES), {
            userId,
            ...propertyData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return {
            success: true,
            id: docRef.id
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Get user's saved properties
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Result with properties array
 */
export const getUserProperties = async (userId) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.SAVED_PROPERTIES),
            where('userId', '==', userId),
            orderBy('updatedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const properties = [];

        querySnapshot.forEach((doc) => {
            properties.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return {
            success: true,
            properties
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            properties: []
        };
    }
};

export { COLLECTIONS };
