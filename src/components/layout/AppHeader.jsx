import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';



const headerStyle = {
    with: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'

};

export default function AppHeader() {
    const { crypto } = useCrypto();
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState(null)

    useEffect(() => {
        function keypress(event) {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }

        document.addEventListener('keypress', keypress)

        return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleSelect(value) {
        setModal(true)
        setCoin(crypto.find(coin => coin.id == value))
        console.log(coin)
    }



    return (
        <Layout.Header style={headerStyle}>
            <Select
                open={select}
                style={{
                    width: 250,
                }}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value="press / to open"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                    </Space>
                )}
            />


            <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CoinInfoModal coin={coin} />
            </Modal>

            <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
                <AddAssetForm  onClose={() => setDrawer(false)}  />
            </Drawer>

        </Layout.Header>
    )
}