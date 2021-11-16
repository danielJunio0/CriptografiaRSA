import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { BigNumber } from "bignumber.js";

export function Home() {

    const [primoQ, setPrimoQ] = useState(0);
    const [primoP, setPrimoP] = useState(0);
    const [mensagem, setMensagem] = useState('');

    const [n, setN] = useState(0);

    const [z, setZ] = useState(0);
    const [d] = useState(23);
    const [e, setE] = useState(3);

    const [mensagemCriptografada, setMensagemCriptografada] = useState([]);
    const [mensagemDescriptografada, setMensagemDescriptografada] = useState();

    const [msgResultado, setMsgResultado] = useState('');

    useEffect(() => {
        setN(primoQ * primoP);
        setZ((primoP - 1) * (primoQ - 1));
    }, [primoQ, primoP]);

    function HandleCriptografar() {

        if (primoQ <= 0 || primoP <= 0 || mensagem == '')
            alert('Todos campos devem ser devidamente preenchidos!')
        else {
            var eLocal = e;

            while ((eLocal * d) % z != 1) {
                eLocal++;
            }
            setE(eLocal);
            CriptografarMensagem();
        }
    }

    function CriptografarMensagem() {

        var msgEncript = [];

        mensagem.split('').forEach(letra => {
            var value = (letra.charCodeAt() ** e) % n;
            msgEncript.push(value);
        });

        setMsgResultado(msgEncript);
        setMensagemCriptografada(msgEncript);
    }

    function DescriptografarMensagem() {
        var msgDescript = [];
        mensagemCriptografada.forEach(char => {
            var numero = new BigNumber(char);
            var x = numero.pow(d).mod(n);
            msgDescript.push(String.fromCharCode(x));
        });
        setMensagemDescriptografada(msgDescript);
    }

    useEffect(() => {
        DescriptografarMensagem();
    }, [mensagemCriptografada]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Paper style={{
                    maxWidth: '600px',
                    backgroundColor: 'white',
                    padding: '18px',
                }}
                    elevation={12}
                >
                    <Typography variant="h5" align="center" style={{ padding: '10px', color: '#8e05c2' }}>
                        Criptografia RSA
                    </Typography >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
                        <TextField
                            id="outlined"
                            label="Insira o valor de P"
                            type="number"
                            onChange={value => setPrimoP(Number(value.target.value))}
                            style={{ paddingRight: '5px' }}
                        />
                        <TextField
                            id="outlined"
                            label="Insira o valor de Q"
                            type="number"
                            onChange={value => setPrimoQ(Number(value.target.value))}
                            style={{ paddingLeft: '5px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            id="outlined"
                            label="Insira a Mensagem"
                            type="text"
                            onChange={value => setMensagem(value.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <Button onClick={HandleCriptografar} variant="contained" style={{ backgroundColor: '#aa14f0' }}>
                            Criptografar
                        </Button>
                    </div>
                    <div>
                        <TextField
                            id="outlined"
                            label="Resultado"
                            type="text"
                            value={msgResultado}
                            style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
                        />
                        <Typography style={{ padding: '10px' }}>
                            Mensagem Descriptografada: {mensagemDescriptografada}
                        </Typography>
                    </div>
                    <Typography
                        variant="h7"
                        align="center"
                        style={{
                            padding: '10px',
                            color: '#8e05c2',
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            display: 'flex'
                        }}>
                        Daniel Junio Barbosa & Gabriel Rodrigues
                    </Typography >
                </Paper>
            </div>
        </>
    );
}