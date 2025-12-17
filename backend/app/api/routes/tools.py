from fastapi import APIRouter, HTTPException
import httpx
import os

from app.api.schemas.hand import (
    HandEvaluationRequest,
    HandEvaluationResponse,
    HandOddsRequest,
    HandOddsResponse,
)

router = APIRouter(prefix="/tools", tags=["tools"])

# Go service on localhost (same EC2 instance)
GO_SERVICE_URL = os.getenv("GO_SERVICE_URL", "http://localhost:8001")


@router.post("/evaluate", response_model=HandEvaluationResponse)
async def evaluate_hand(request: HandEvaluationRequest):
    """Evaluate hand using Go microservice."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                f"{GO_SERVICE_URL}/evaluate",
                json={
                    "hole_cards": request.hole_cards,
                    "board_cards": request.board_cards,
                },
            )
            response.raise_for_status()
            data = response.json()
            return HandEvaluationResponse(hand=data["hand"], rank=data["rank"])
    except httpx.HTTPError as e:
        raise HTTPException(status_code=503, detail=f"Go service error: {str(e)}")


@router.post("/odds", response_model=HandOddsResponse)
async def calculate_odds(request: HandOddsRequest):
    """Calculate odds using Go microservice."""
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{GO_SERVICE_URL}/odds",
                json={
                    "hole_cards": request.hole_cards,
                    "board_cards": request.board_cards,
                    "num_opponents": request.num_opponents,
                },
            )
            response.raise_for_status()
            data = response.json()
            return HandOddsResponse(win=data["win"], tie=data["tie"], loss=data["loss"])
    except httpx.HTTPError as e:
        raise HTTPException(status_code=503, detail=f"Go service error: {str(e)}")
