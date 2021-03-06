import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Card, Col, Row, Button, Modal, Form, Input, Select, DatePicker, Typography } from 'antd';
import styled from 'styled-components'; 
import { useContextInfo } from '../hooks/context'
import { createStreamingFn, getOneStreamingFn, editStreamingFn, deleteStreamingFn } from '../services/streaming'

const LinkStyled = styled.div`
    position: fixed; 
    top: 70px; 
    left: 70px; 
    z-index: 5;
    span {
        display: none;
    }
    @media ${props => props.theme.device.tablet} {
        span {
            display: inline-block;
        }
    }
`

const MyStreamings = () => {
    const { user, artist, myStreamings, setMyStreamingsFn } = useContextInfo()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);
    const [isModal3Visible, setIsModal3Visible] = useState(false);
    const [editStreaming, setEditStreaming] = useState(null)
    const [streamingToBeEdited, setStreamingToBeEdited] = useState(null)
    const [form] = Form.useForm();
    
    useEffect(() => {
        async function setStreamingToEdit() {
            if (editStreaming) {
                const {data} = await getOneStreamingFn(editStreaming)
                setStreamingToBeEdited(data)
            }
        }
        setStreamingToEdit()
    }, [isModal2Visible, isModal3Visible, editStreaming])

    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
      };

        const onFinish = async (values) => {
            let hour
            if(values.date) hour = values.date.toDate()
            await createStreamingFn({...values, hour})
            setMyStreamingsFn()
            setIsModalVisible(false)
            form.resetFields()
        };

        const onFinish2 = async (values) => {
            let hour
            values.date ? hour = values.date.toDate() : hour = streamingToBeEdited.hour
            const id = streamingToBeEdited._id
            await editStreamingFn(id, {...values, hour})
            setMyStreamingsFn()
            setIsModal2Visible(false)
            setStreamingToBeEdited(null)
            setEditStreaming(null)
        }

        const deleteStreaming = async () => {
            const id = streamingToBeEdited._id
            await deleteStreamingFn(id)
            setMyStreamingsFn()
            setIsModal3Visible(false)
            setStreamingToBeEdited(null)
        }
      
        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModal2 = () => {
        setIsModal2Visible(true);
    };
    
    const showModal3 = () => {
        setIsModal3Visible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModal2Visible(false);
        setIsModal3Visible(false);
        setStreamingToBeEdited(null)
        setEditStreaming(null)
    };

    return user && (
        <div className="page">
            <LinkStyled><Link to="/profile"><i style={{marginRight: "10px"}} className="fas fa-arrow-left"></i><span>Perfil</span></Link></LinkStyled>
            <h1>Mis streamings</h1>
            {user.role === "artist" ? <div>
            <Button onClick={showModal}>Agregar un streaming</Button>

            <Modal
                style={{ top: 20, fontFamily: "'Roboto', sans-serif" }}
                title="Agregar streaming"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >

                <Form
                    {...layout}
                    form={form}
                    name="addStreaming"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%"}}
                    >
                     <Form.Item
                        label="Título de la clase/concierto/charla"
                        name="title"
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha y hora"
                        name="date"
                    >
                    <DatePicker showTime />
                    </Form.Item>

                    <Form.Item
                        label="Tipo de stream"
                        name="type"
                    >
                        <Select placeholder="Tipo de stream" >
                            <Select.Option value="private">Privado</Select.Option>
                            <Select.Option value="public">Público</Select.Option>
                        </Select>
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" htmlType="submit" style={{width: "230px"}}>
                        Agregar
                        </button>
                    </Form.Item>
                    </Form>

            </Modal>

            <Modal
                style={{ top: 20, fontFamily: "'Roboto', sans-serif" }}
                title="Editar streaming"
                visible={isModal2Visible}
                onCancel={handleCancel}
                footer={null}
            >
            {streamingToBeEdited &&
                <Form
                    {...layout}
                    name="editStreaming"
                    initialValues={{ remember: true }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{margin: "0 15%"}}
                    >
                     <Form.Item
                        label="Título de la clase/concierto/charla"
                        name="title"
                        initialValue={streamingToBeEdited.title}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Descripción"
                        name="description"
                        initialValue={streamingToBeEdited.description}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha y hora"
                        name="date"
                    >
                    <DatePicker showTime />
                    </Form.Item>

                    <Form.Item
                        label="Tipo de stream"
                        name="type"
                        initialValue={streamingToBeEdited.type}
                    >
                        <Select placeholder="Tipo de stream" >
                            <Select.Option value="private">Privado</Select.Option>
                            <Select.Option value="public">Público</Select.Option>
                        </Select>
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <button className="btn" htmlType="submit" style={{width: "230px"}}>
                        Guardar cambios
                        </button>
                    </Form.Item>
                    </Form>}

            </Modal>

            <Modal
                style={{ top: 20, fontFamily: "'Roboto', sans-serif" }}
                title="Borrar streaming"
                visible={isModal3Visible}
                onCancel={handleCancel}
                onOk={deleteStreaming}
                okText="Borrar"
                cancelText="Cancelar"
                okType="danger primary"
                
            >
            <Typography.Title type="danger" level={5}>Estás segura de borrar este streaming?</Typography.Title>

            </Modal>

            {myStreamings ?
                <Row style={{padding: "40px"}} gutter={16}>
                {myStreamings.map(stream => {
                    let fecha
                    if(stream.hour) {
                        fecha = new Date(stream.hour).toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}).toString()
                    }
                    return (<Col lg={{span:8}} md={{span:12}} xs={{span: 24}}>
                    <i onClick={() => {
                        setEditStreaming(stream._id)
                        showModal2()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", right: "40px", zIndex: "5", color: "white"}} className="far fa-edit"></i>
                    <i onClick={() => {
                        setEditStreaming(stream._id)
                        showModal3()
                    } } style={{cursor: "pointer", position: "absolute", top: "20px", left: "40px", color: "red", zIndex: "5"}} className="far fa-trash-alt"></i>
                    <Card cover={<video controls></video>} bordered={false}>
                    <Typography.Title level={3}>{stream.title}</Typography.Title>
                    {stream.hour && <Typography.Text>{fecha}</Typography.Text>}<br />
                    <Typography.Text>{stream.description}</Typography.Text><br />
                    <Typography.Text>Copiá el siguiente código para empezar a stremear:</Typography.Text><br />
                    <Typography.Text copyable>{stream.streamKey}</Typography.Text><br />
                    <Typography.Text>Te recomendamos <a href="https://obsproject.com/es">OBS</a> que es gratis y de código abierto</Typography.Text><br />
                    <Link to={`/streaming/${stream._id}`}><Button>Accion</Button></Link><br />
                    {artist && <Typography.Text>{artist.name}</Typography.Text>}
                    </Card>
                    
                </Col>)})}
            </Row> : <div></div>}
            </div> : <div></div> }
        </div>
    )
}

export default MyStreamings
