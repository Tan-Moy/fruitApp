import { Injectable } from '@angular/core';
import TrueVaultClient from 'truevault';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TruevaultService {
  accId = environment.ACCOUNT_ID;
  vaultId = environment.VAULT_ID;

  constructor() {}

  async getUserToken(data) {
    const tvClient = await TrueVaultClient.login(
      this.accId,
      data.username,
      data.password
    );
    localStorage.trueVaultAccessToken = tvClient.accessToken;
    return tvClient;
  }

  async submitFruit(data) {
    const tvClient = new TrueVaultClient({
      accessToken: localStorage.trueVaultAccessToken,
    });
    const currUser = await tvClient.readCurrentUser();
    const userId = currUser.id;
    const savedRes = await tvClient.createDocument(
      this.vaultId,
      null,
      data,
      userId
    );
    return savedRes;
  }

  async deleteFruit(fruitId) {
    const tvClient = new TrueVaultClient({
      accessToken: localStorage.trueVaultAccessToken,
    });
    const fruitList = await tvClient.deleteDocument(this.vaultId, fruitId);
    return fruitList;
  }

  async getFruits() {
    const tvClient = new TrueVaultClient({
      accessToken: localStorage.trueVaultAccessToken,
    });
    const fruitList = await tvClient.listDocuments(this.vaultId, true);
    return fruitList;
  }

  async logOut() {
    const tvClient = new TrueVaultClient({
      accessToken: localStorage.trueVaultAccessToken,
    });
    const logOut = await tvClient.logout();
    localStorage.clear();
    return logOut;
  }
}
