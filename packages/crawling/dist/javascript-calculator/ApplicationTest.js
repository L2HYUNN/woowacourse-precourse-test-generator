describe('문자열 계산기', () => {
  test('기본 구분자를 사용한 계산', async () => {
    const inputs = ['1,2,3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 6'));
  });

  test('기본 구분자 사용', async () => {
    const inputs = ['2,4:8'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 14'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 구분자 사용', async () => {
    const inputs = ['1,2;3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 1'));
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1,2:3;4;5'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 15'));
  });

  test('커스텀 공백 구분자 사용', async () => {
    const inputs = ['// \\n1 2 3 4 6'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 16'));
  });

  test('빈 입력 처리', async () => {
    const inputs = [''];
    mockQuestions(inputs);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('결과 : 0'));
  });

  test('음수 입력 예외 처리', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('숫자가 아닌 입력 예외 처리', async () => {
    const inputs = ['1,a,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자 뒤 숫자가 아닌 입력 예외 처리', async () => {
    const inputs = ['//;\\na;2;3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('첫번째에 delimiter 입력 예외 처리', async () => {
    const inputs = [',1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('마지막 숫자 뒤에 delimiter 입력 예외 처리', async () => {
    const inputs = ['1,2,3:'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('consecutive delimiter 입력 예외 처리', async () => {
    const inputs = ['1,,2,3::4'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('consecutive delimiter 입력 예외 처리', async () => {
    const inputs = ['//;;\\n1;;2;;3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 입력 아무것도 없을 경우 예외 처리', async () => {
    const inputs = ['//\\n1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('잘못된 커스텀 예외 처리', async () => {
    const inputs = [';\\n-1,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('소수점 있는 숫자 입력 예외 처리', async () => {
    const inputs = ['1.5,2,3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('여러 문자로 된 커스텀 구분자 예외 처리', async () => {
    const inputs = ['//;;\\n1;;2;;3'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('여러 개의 커스텀 구분자 예외 처리', async () => {
    const inputs = ['//;,:\\n1;2,3:4'];
    mockQuestions(inputs);
    const app = new App();
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  describe('기능 요구 사항에 기재된 내용 테스트', () => {
    describe('커스텀 구분자가 없는 경우', () => {
      test('아무것도 입력되지 않은 경우 0을 반환한다', async () => {
        const inputs = [''];
        mockQuestions(inputs);

        const logSpy = getLogSpy();
        const outputs = ['결과 : 0'];

        const app = new App();
        await app.run();

        outputs.forEach((output) => {
          expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
        });
      });

      test('기본 구분자가 있는 경우 기본 구분자를 기준으로 분리한 각 수의 합을 반환한다', async () => {
        const inputs = ['1,2:3,,4:::5'];
        mockQuestions(inputs);

        const logSpy = getLogSpy();
        const outputs = ['결과 : 15'];

        const app = new App();
        await app.run();

        outputs.forEach((output) => {
          expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
        });
      });
    });

    describe('커스텀 구분자가 있는 경우', () => {
      test('커스텀 구분자가 올바른 위치에 정의되지 않은 경우 에러를 발생시킨다', async () => {
        const inputs = ['1:2//;\\n:3'];
        mockQuestions(inputs);

        const app = new App();

        await expect(app.run()).rejects.toThrow('[ERROR]');
      });

      test('커스텀 구분자가 숫자로만 구성된 경우 에러를 발생시킨다', async () => {
        const inputs = ['//12\\n1:2:3'];
        mockQuestions(inputs);

        const app = new App();

        await expect(app.run()).rejects.toThrow('[ERROR]');
      });

      test('커스텀 구분자가 중복되서 존재하는 경우 에러를 발생시킨다', async () => {
        const inputs = ['//;\\n1:2://;\\n3'];
        mockQuestions(inputs);

        const app = new App();

        await expect(app.run()).rejects.toThrow('[ERROR]');
      });

      test('커스텀 구분자가 //의 경우 //를 커스텀 구분자로 사용할 수 있다', async () => {
        const inputs = ['////\\n1//2//3'];
        mockQuestions(inputs);

        const logSpy = getLogSpy();
        const outputs = ['결과 : 6'];

        const app = new App();
        await app.run();

        outputs.forEach((output) => {
          expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
        });
      });
    });
  });

  describe('기능 요구 사항에 기재되지 않은 내용 테스트', () => {
    test('커스텀 기본자와 함께 기본 구분자가 주어지는 경우 모두를 구분자로 사용한다', async () => {
      const inputs = ['//;\\n1;2:3,4'];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ['결과 : 10'];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test('커스텀 구분자가 빈 값인 경우 기본 구분자를 기준으로 분리한 각 수의 합을 반환한다', async () => {
      const inputs = ['//\\n1,2:3,,4:::5'];
      mockQuestions(inputs);

      const app = new App();

      await expect(app.run()).rejects.toThrow('[ERROR]');
    });

    test('유효한 숫자 앞에 0이 있는 경우 에러가 발생하지 않아야한다', async () => {
      const inputs = ['00123'];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ['결과 : 123'];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });
  });
});
describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

// 추가 테스트
describe('추가 테스트', () => {
  test('공백이 숫자로 주어진 경우 0으로 판단', async () => {
    const inputs = ['1,2,,3'];
    mockQuestions(inputs);

    logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자에 문자 사용', async () => {
    const inputs = ['//g\\n1g3:5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 9'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('공백 무시', async () => {
    const inputs = ['1,2, 3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});

describe('추가 예외 테스트', () => {
  test('입력값에 커스텀 아닌 특수 기호 포함된 경우', async () => {
    const inputs = ['1,2,3;5'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('숫자나 구분자 외의 문자가 포함된 경우', async () => {
    const inputs = ['1,2,hi:3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자가 숫자인 경우', async () => {
    const inputs = ['//3\\n1'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자가 음수 표시(-)인 경우', async () => {
    const inputs = ['//-\\n1'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자가 소수점 표시(.)인 경우', async () => {
    const inputs = ['//.\\n1'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
describe('문자열 계산기', () => {
  test('기본 구분자로 분리', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자로 분리', async () => {
    const inputs = ['//;\\n1;2;3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자에 숫자가 들어갔을 때', async () => {
    const inputs = ['//123\\n412351236'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 15'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자가 잘못됐을 때 테스트', async () => {
    const inputs = ['//;\\b1;2;3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('사용자 입력없을 때', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자로 끝날 때', async () => {
    const inputs = ['//.\\n1.2.3.4.'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('양수가 아닌 0이 입력되었을 때', async () => {
    const inputs = ['0,1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('숫자 외에 문자가 입력되었을 때', async () => {
    const inputs = ['1,a,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
describe('문자열 계산기', () => {
  test('빈 문자열', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과: 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자로 여러 문자 사용', async () => {
    const inputs = ['//*;*\\n0.5*;*1.5*;*2.5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 4.5'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('소수', async () => {
    const inputs = ['0.5,1.5,2.5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 4.5'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('소수와 커스텀 구분자', async () => {
    const inputs = ['//;\\n0.5;1.5;2.5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 4.5'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 이후 아무 값도 입력하지 않은 경우', async () => {
    const inputs = ['//-\\n'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 이후 0을 입력한 경우', async () => {
    const inputs = ['//-\\n0'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('null 예외 테스트', async () => {
    const inputs = [null];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('undefined 예외 테스트', async () => {
    const inputs = [undefined];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('공백 예외 테스트', async () => {
    const inputs = ['    '];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('문자 예외 테스트', async () => {
    const inputs = ['abc'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('숫자와 문자 예외 테스트', async () => {
    const inputs = ['1,2,abc'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
describe('문자열 계산기', () => {
  test('빈 문자열', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 구분자만 존재하는 문자열', async () => {
    const inputs = [',:'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 구분자 사용', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자만 존재하는 문자열', async () => {
    const inputs = ['//;\\n'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 및 커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1,2:3;4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 10'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 및 커스텀 구분자만 존재하는 문자열', async () => {
    const inputs = ['//;\\n,:'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트 - 음수 입력', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
  test('기본 구분자(쉼표) 사용', async () => {
    const inputs = ['1,2,3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 구분자(콜론) 사용', async () => {
    const inputs = ['1:2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('복합 구분자 사용', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 복합 사용', async () => {
    const inputs = ['//;\\n1;2,3:4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 10'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트 - 잘못된 커스텀 구분자 형식', async () => {
    const inputs = ['//;1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트 - 숫자가 아닌 입력', async () => {
    const inputs = ['1,a,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('빈 문자열 입력', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('쉼표 구분자 사용', async () => {
    const inputs = [',,1,,2,3,,'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('콜론 구분자 사용', async () => {
    const inputs = ['3:5:::6'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 14'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자와 기본 구분자 혼용 사용', async () => {
    const inputs = ['//^\\n1,2:3^4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 10'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자만 입력하는 경우', async () => {
    const inputs = ['//&\n'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자가 /, , \n인 경우', async () => {
    const inputs = ['//\\\\n2\\3\\4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 9'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트1', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
  test('예외 테스트2', async () => {
    const inputs = ['1,2,a'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
  test('예외 테스트3', async () => {
    const inputs = ['//;\\n1;2;3;'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
  test('예외 테스트4', async () => {
    const inputs = ['//;\\n1;2;3:4'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
  test('예외 테스트5', async () => {
    const inputs = ['1,,2'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
  test('예외 테스트6', async () => {
    const inputs = ['//;\\n'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 문자열일 때
    const inputs = ['//pp\\n1pp2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 문자열이고 여러 개일때  (p,pp)
    const inputs = ['//p\\n1p2p//pp\\n1pp2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 특수문자일 때
    const inputs = ['//*\\n1*2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 특수문자이며 길이가 2이상일떄
    const inputs = ['//**\\n1**2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 특수문자이며 종류가 여러 개
    const inputs = ['//**\\n1**2**//*\\n1*2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 특수문자+문자열 일때
    const inputs = ['//**\\n1**2**//p\\n1p2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자 + 소수가 포함될 때
    const inputs = ['//;\\n1.5;2.5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 4'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 빈 문자열일 떄
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자가 빈 문자열일 경우
    const inputs = ['// \\n1 2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 기본 구분자와 커스텀 구분자가 같이 있을 때
    const inputs = ['//;\\n1;2,3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 구분자가 숫자일 때
    const inputs = ['//3\\n13234'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 7'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 커스텀 구분자를 뺐을 때 빈문자열이 나오는 경우
    const inputs = ['////\\n///\\n'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 구분자가 /일 때
    const inputs = ['///\\n1/2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 구분자가 //일 때
    const inputs = ['////\\n1//2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    // 구분자가 ///일 때
    const inputs = ['/////\\n1///2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트', async () => {
    // 공백문자가 있을때
    const inputs = ["1,2,3, ''"];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트', async () => {
    // 다른 문자열이 들어가있을 떄
    const inputs = ['1,2,3,;'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('예외 테스트', async () => {
    // 숫자 끝에 소수점이 들어갔을 때
    const inputs = ['1,2,3.'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
