import { IonPage, IonIcon,IonContent, IonInput, IonButton } from '@ionic/react';
import React from 'react';
import {person} from 'ionicons/icons'
import './index.css'

const AuthPage = () => {
    return <IonPage>
                <IonContent>
                  <div className="main-container">
                     <div className="auth-container">
                        <IonIcon size="large" icon={person}></IonIcon>
                        <IonInput label="Username" labelPlacement="floating" fill="outline" ></IonInput>
                        <IonInput type='password' label="Password" labelPlacement="floating" fill="outline" ></IonInput>
                        <IonButton routerLink="/home" fill="outline">
                            Sign In
                        </IonButton>
                     </div>
                   </div>
                </IonContent>
           </IonPage>
};

export default AuthPage;