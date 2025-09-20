from pydantic import BaseModel
import uuid

class CustomBaseModel(BaseModel):
    class Config:
        orm_mode = True
        json_encoders = {
            uuid.UUID: str,
        }