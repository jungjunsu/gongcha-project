package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.response.TransferResponse;
import com.b306.gongcha.dto.response.UserTransferResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TransferService {

    Page<TransferResponse> getAllTransfers(Pageable pageable);
    TransferResponse getTransfer(Long transferId);
    TransferResponse createTransfer(TransferRequest transferRequest);
    TransferResponse updateTransfer(Long transferId, TransferRequest transferRequest);
    Long deleteTransfer(Long transferId);
    UserTransferResponse requestTransfer(Long transferId, Long userId);
    List<UserTransferResponse> getUserTransferByUser(Long userId);
    List<UserTransferResponse> getUserTransferByTransfer(Long transferId);
    UserTransferResponse getUserTransfer(Long transferId, Long userId);
    UserTransferResponse acceptTransfer(Long transferId, Long userId);
    Long rejectTransfer(Long transferId, Long userId);

}
