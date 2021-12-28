import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default {
    methods: {
        async getUserFingerPrint() {
            const fpPromise = FingerprintJS.load();
            // Get the visitor identifier when you need it.
            const fp = await fpPromise;
            const result = await fp.get();
            localStorage.setItem('fingerPrint', result.visitorId);
            return await result.visitorId;
        }
    }
}