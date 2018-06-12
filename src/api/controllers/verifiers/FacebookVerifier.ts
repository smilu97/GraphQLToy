
import { FacebookLoginRequest } from '../requests/FacebookRequests';

async function facebookVerifier(fbReq: FacebookLoginRequest): Promise<boolean> {
    return true;
}

export default facebookVerifier;
