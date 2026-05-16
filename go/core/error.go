package core

type TelegramMailingServiceError struct {
	IsTelegramMailingServiceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTelegramMailingServiceError(code string, msg string, ctx *Context) *TelegramMailingServiceError {
	return &TelegramMailingServiceError{
		IsTelegramMailingServiceError: true,
		Sdk:              "TelegramMailingService",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TelegramMailingServiceError) Error() string {
	return e.Msg
}
