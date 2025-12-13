import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile,
    User,
    NextOrObserver
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Authentication Service
 * Handles all Firebase Authentication operations
 */

interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
    code?: string;
}

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName = ''): Promise<AuthResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update profile with display name if provided
        if (displayName) {
            await updateProfile(userCredential.user, { displayName });
        }

        return {
            success: true,
            user: userCredential.user
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            code: error.code
        };
    }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            code: error.code
        };
    }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthResponse> => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            code: error.code
        };
    }
};

// Sign out
export const logOut = async (): Promise<{ success: boolean; error?: string }> => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Reset password
export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string; code?: string }> => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            code: error.code
        };
    }
};

// Auth state observer
export const onAuthChange = (callback: NextOrObserver<User | null>) => {
    return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};
